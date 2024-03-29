import { ContextConsumer } from "../Context";

export default function InfoPlate() {
  const renderPainting = ({ currentPainting }) => {
    const {
      name,
      link,
      artist,
      artistLink,
      otherName,
      dimensions,
      location,
      medium,
      years,
    } = currentPainting;

    return (
      <div className="info-plate">
        <a href={artistLink} className="plate artist">
          {artist}
        </a>
        <br />
        <a href={link} className="plate name">
          {name}
          {otherName ? ` (${otherName})` : null}
        </a>
        <br />
        Painted in {years} on {medium} ({dimensions})
        <br />
        Exposed at {location}
      </div>
    );
  };
  return <ContextConsumer>{(props) => renderPainting(props)}</ContextConsumer>;
}
