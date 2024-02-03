import "../styles/leftComponent.css";

export default function LeftComponent() {
  return (
    <div className="left-side-container">
      <h2 className="title-text">
        Episodes of the <span className="highlight"> 4th</span> season of the
        series <span className="colored">Rick and Morty</span>
      </h2>
      <img
        className="image-main"
        src="\images\image.png"
        alt="image of Rick and Morty in a portal"
      ></img>
    </div>
  );
}
