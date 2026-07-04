import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("")
  const [short, setShort] = useState(() => {
    const data = localStorage.getItem("url")
    return data ? JSON.parse(data) : [];
  })

  useEffect(() => {
    localStorage.setItem("url", JSON.stringify(short))
  }, [short])


  const handleshortUrl = () => {

    if (!url.trim()) {
      setError("Please enter url")
      return
    }


    let baseUrl = "short.ly/"
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxycz1234567890"
    let result = ""

    for (var i = 0; i < 5; i++) {
      var index = Math.floor(Math.random() * chars.length)
      result += chars[index]
    }
    var shortUrl = baseUrl + result




    if (URL.canParse(url)) {
      console.log(url)
      setShort([...short, { url, shortUrl }])
      setError("")
      setUrl("")
    } else {
      setError("Please Enter correct  url.")
    }



  }


  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
  }

  const handleDelete = (i) => {
    const filtered = short.filter((_, index) => {
      return i !== index
    })
    setShort(filtered)
  }

  const clearAll = () => {
    localStorage.clear()
    setShort([])
  }




  return (
    <div className='container'>
      <div>
        <h1 className='heading'>URL Shortner</h1>

        <div className='input-box'>
          <input type="text"
            placeholder='enter url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='input-text'
          />
          <button onClick={handleshortUrl} className='btn'>Shorten Url</button>
        </div>
        <div>
          {error && (
            <h3>{error}</h3>
          )
          }
        </div>

        <div>
          {short &&
            (
              short.map((item, index) => {
                return (
                  <div key={index} className='url-container'>
                    <h1 style={{ textDecoration: "underline" }}>{item.url}</h1>
                    <h2>{item.shortUrl}</h2>
                    <button onClick={() => handleCopy(item.shortUrl)} className='copy'>Copy</button>
                    <button onClick={() => handleDelete(index)} className='del'>Delete</button>
                  </div>
                )
              })
            )}
        </div>
        {short.length > 0 && (
          <button className='clear' onClick={clearAll}> Clear All </button>
        )}
      </div>

    </div >
  )
}

export default App