import React from "react"
import "./styles/card-animated.css"

interface Project {
  image?: string,
  name: string,
  interes: number,
  TIR: number,

}

const CardProject: React.FC<Project> = (props) => {
  return (


    <article className="card">
  <img
    className="card__background"
    src="https://phototraces.b-cdn.net/wp-content/uploads/2014/09/500px-1.jpg"
    alt=""
    width="1920"
    height="2193"
  />
  <div className="card__content | flow">
    <div className="card__content--container | flow">
      <h2 className="card__title">{props.name}</h2>
      <div className='tokenInfo'>
        <div className="price">
          <ins>◘</ins>
          <p>{props.TIR}</p>
        </div>
        <div className="duration">
          <ins>%</ins>
          <p>{props.interes}</p>
        </div>
      </div>
    </div>

  </div>
</article>




  )
}

export default CardProject