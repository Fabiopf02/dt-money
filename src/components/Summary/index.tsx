import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransctions } from '../../contexts/transactions';

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransctions()

  const sumary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    } else {
      acc.withdrawals += transaction.amount
      acc.total -= transaction.amount
    }
    return acc
  }, {
    deposits: 0,
    withdrawals: 0,
    total: 0,
  })

  function formatMoney(value: number): string {
    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{formatMoney(sumary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>{formatMoney(sumary.withdrawals)}</strong>
      </div>
      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{formatMoney(sumary.total)}</strong>
      </div>
    </Container>
  )
}