import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import CadastroForm from '../components/CadastroForm'
import OpReview from '../components/OpReview'
import ErrorSnack from '../components/ErrorSnack'
import firebase from 'firebase/app'
require('firebase/firestore')

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  error: {
    backgroundColor: theme.palette.error.dark
  }
})

const steps = ['Dados do Cartão', 'Revisão']

const db = firebase.firestore()

class Cadastro extends React.Component {
  state = {
    activeStep: 0,
    loading: false,
    isValid: false,
    error: null,
    card: {
      name: '',
      number: null,
      cellphone: '(83) 9',
      balance: 0,
      active: true
    }
  }

  setError = error => {
    this.setState({ error, loading: false })
  }

  handleSubmit = async () => {
    // FIX - check type of number - should be string
    this.setState({ loading: true })
    const { card } = this.state
    const check = await db
      .collection('cards')
      .where('number', '==', card.number)
      .get()
    if (!check.empty)
      return this.setError('Já existe um cartão cadastrado com esse número')
    try {
      await db.collection('cards').add(card)
      this.setState({ activeStep: 1, loading: false })
    } catch (e) {
      console.log('Erro ao cadastrar cartão')
      console.log(e)
      this.setError('Ocorreu um erro ao cadastrar o cartão')
    }
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  checkValidity = () => {
    const {
      card: { name, number }
    } = this.state
    if (!name || name.length < 5 || !number || number > 700 || number < 0)
      return
    this.setState({ isValid: true })
  }

  onChangeField = field => e => {
    this.setState(
      { card: { ...this.state.card, [field]: e.target.value } },
      this.checkValidity
    )
  }

  getStepContent = (step, card) => {
    switch (step) {
      case 0:
        return <CadastroForm onChangeField={this.onChangeField} card={card} />
      case 2:
        return <OpReview />
      default:
        throw new Error('Unknown step')
    }
  }

  handleCloseError = () => {
    this.setError(null)
  }

  render() {
    const { classes } = this.props
    const { activeStep, card, loading, isValid, error } = this.state

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Cadastro
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {this.getStepContent(activeStep, card)}
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                  onClick={this.handleSubmit}
                  className={classes.button}
                >
                  {loading && (
                    <CircularProgress
                      style={{ color: 'white' }}
                      size={20}
                      thickness={3}
                    />
                  )}
                  {!loading && (activeStep === 0 ? 'Cadastrar' : 'Novo')}
                </Button>
              </div>
            </React.Fragment>
          </Paper>
        </main>
        <ErrorSnack value={error} onClose={this.handleCloseError}/>
      </React.Fragment>
    )
  }
}

Cadastro.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Cadastro)
