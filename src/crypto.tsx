import { useState } from 'react'
import './App.css'

const CryptoTrecker = () => {
  const [crypto, setCrypto] = useState<string>('')
  const [price, setPrice] = useState<number | null>(null)
  const [error, setError] = useState<string>('')

  const fetchCrypto = async (): Promise<void> => {
    if (!crypto) return
    setPrice(null)
    setError('')
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto.toLowerCase()}&vs_currencies=usd`
      )

      if (!response.ok) throw new Error('Криптовалюта не найдена')
      const data = await response.json()
      if (data[crypto.toLowerCase()]) {
        setPrice(data[crypto.toLowerCase()].usd)
      } else {
        throw new Error('Криптовалюта не найдена')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    }
  }

  return (
    <div className='main'>
      <h1 className='header'>Курс криптовалют</h1>
      <input
        className='input'
        type='text'
        value={crypto}
        placeholder='Введите криптовалюту'
        onChange={e => setCrypto(e.target.value)}
      ></input>
      <button className='button ' onClick={fetchCrypto}>
        Получить курс
      </button>
      {price !== null && <p>Цена криптовалюты: ${price.toString()}</p>}
      {}
      {error && <p>{error}</p>}

      <p>
        Данные взяты с сайта{' '}
        <a
          className='href'
          href='https://www.coingecko.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          CoinGecko
        </a>
      </p>
    </div>
  )
}
export default CryptoTrecker
