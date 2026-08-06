import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import HistoricoCartao from './HistoricoCartao'

const styles = {
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15
  },
  real: {
    fontSize: '19px',
  },
}

const DetalhesSorteio = ({
  classes,
  card: { number, name, balance, active, cellphone },
  hideHistorico
}) => {
  return (
    <Fragment>
      <div className={classes.root}>
        <div
          style={{
            borderRight: '1px solid #ccc',
            paddingRight: '10px',
            width: '60%',
          }}
        >
          <div>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              donx
            </Typography>
            <Typography variant="h6" component="h2" color={'secondary'}>
              {name}
            </Typography>
          </div>
        </div>
        <div>
          <div>
            <Typography
              className={classes.title}
              color="textSecondary"
              align="right"
              gutterBottom
            >
              cartão
            </Typography>
            <Typography
              variant="h6"
              className={classes.real}
              component="h2"
              color="primary"
              align="right"
              noWrap
            >
              {number}
            </Typography>
          </div>
        </div>
      </div>
      {number && !hideHistorico && <Typography variant="h6" style={{marginTop: 15}} align="center">Histórico</Typography>}
      {number && !hideHistorico && <HistoricoCartao cardNumber={number} />}
    </Fragment>
  )
}

DetalhesSorteio.propTypes = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.object,
}

export default withStyles(styles)(DetalhesSorteio)
