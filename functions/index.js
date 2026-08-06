const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

var db = admin.firestore()

exports.onNewUser = functions.firestore
  .document('/users/{userId}')
  .onCreate(snap => {
    console.log('33')
    const statRef = db.collection('stats').doc('2018')
    return snap.ref.set({ roles: 'r' }, { merge: true }).then(() => {
      console.log('4')
      return statRef.get().then(result => {
        const newStat = result.data()
        newStat.users++
        console.log('SAVING STAT FOR LOG')
        console.log(newStat)
        return statRef.set(newStat, { merge: true })
      })
    })
  })

exports.onNewLog = functions.firestore
  .document('/logs/{log}')
  .onCreate(snap => {
    const log = snap.data()
    console.log(Date.now())
    console.log(log)
    const statRef = db.collection('stats').doc('2018')
    return statRef.get().then(result => {
      const newStat = result.data()
      const diff = Math.abs(log.balanceBefore - log.balanceAfter)
      switch (log.type) {
        case 'c':
          newStat.incoming += diff
          newStat.cards++
          break
        case 'u':
          newStat.incoming += diff
          break
        case 'v':
          newStat.outcoming += diff
          break
        case 'f':
          newStat.outcoming += diff
        default:
          break
      }
      return statRef.set(newStat, { merge: true })
    })
  })

exports.getProblematicCards = functions.https.onRequest((req, res) => {

  return db.collection('cards').get().then(result => {
    let cards = []
    result.forEach(cardRef => {
      const { balance, number } = cardRef.data()
      if (balance % 50 !== 0){
        cards.push(number)
      }
    })
    return res.json(cards)
  })
}) 


exports.getRemainingCargs = functions.https.onRequest((_, res) =>{
  return db.collection('cards').where('active', '==', true).get().then(result => {
    let remainingBalances = []
    let totalBalance = 0
    result.forEach(ref => {
      let { balance } = ref.data()
      remainingBalances.push(balance)
      totalBalance += balance
    })
    return res.json({average: totalBalance / remainingBalances.length, remainingBalances, totalBalance })
  })
})

exports.getBestSalespersons = functions.https.onRequest((_, res) => {
  const usersSale = {}
  const finalResult = {}

  return db.collection('logs').where('type', '==', 'v').get().then((result) => {
    result.forEach(docRef => {
      const log = docRef.data()
      const value = log.balanceBefore - log.balanceAfter
      if (usersSale[log.userId]) {
        usersSale[log.userId] += value
      } else {
        usersSale[log.userId] = value || 1
      }
    })
    return db.collection('users').get().then(result => {
      result.forEach(userRef => {
        const { uid, name } = userRef.data()
        finalResult[name] = usersSale[uid]
      })
      return res.json(finalResult)
    })
  })
})

exports.initialState = functions.https.onRequest((req, res) => {
  const statRef = db.collection('stats').doc('2018')
  return db
    .collection('logs')
    .get()
    .then(result => {
      const newStat = { cards: 0, incoming: 0, outcoming: 0, users: 0 }
      console.log('analysing ', result.size, ' logs')
      result.forEach(logRef => {
        const log = logRef.data()
        const diff = Math.abs(log.balanceBefore - log.balanceAfter)
        switch (log.type) {
          case 'c':
            newStat.cards++
            newStat.incoming += diff
            break
          case 'u':
            newStat.incoming += diff
            break
          case 'v':
            newStat.outcoming += diff
            break
          case 'f':
            newStat.outcoming += diff
          default:
            break
        }
      })
      console.log('newStat is ')
      console.log(newStat)
      return db
          .collection('users')
          .get()
          .then(result => {
            newStat.users = result.size
            return statRef.set(newStat)
          })
    }).then(()=>res.json('Ok'))
})
