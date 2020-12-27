import React, { Fragment, useEffect, useState } from 'react'
import './GetRandomQuotes.css'

const GetRandomQuotes = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState([])
  const [indexof, setIndexof] = useState(0)

  useEffect(() => {
    setLoading(true)
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setData(data)
        setIndexof(Math.floor(Math.random() * data.length))
      })
      .catch((error) => {
        setLoading(false)
        setError('Fetch failed!')
      })
  }, [])
  if (loading) return <p>loading random quote.....</p>

  if (error !== '') return <p>{error}</p>

  return (
    <Fragment>
      {data.map(
        (item, index) =>
          index === indexof && (
            <div
              id='quote-box'
              key={(item.author + Math.random().toString()).trim()}
            >
              <h4>
                Random Quotes Generator ({indexof} / {data.length})
              </h4>
              <h2 id='text'>" {item.text} "</h2>
              <h3 id='author'>
                ~~{item.author ? item.author : 'Anonymous/Unknown'}
              </h3>
              <button
                id='new-quote'
                type='submit'
                onClick={() =>
                  setIndexof(Math.floor(Math.random() * data.length))
                }
              >
                New Quote
              </button>
              <a
                id='tweet-quote'
                href='https://twitter.com/intent/tweet'
                target='_blank'
                rel='noopener noreferrer'
              >
                Tweet Quote
              </a>
            </div>
          )
      )}
      <p>designed&developed by Vincent Limo</p>
    </Fragment>
  )
}
export default GetRandomQuotes
