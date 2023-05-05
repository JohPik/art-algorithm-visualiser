import { ContextConsumer } from "../Context";

export default function Resize(props) {
  const renderPainting = ({ currentPainting }) => (
    <div className={`resize ${currentPainting.colorApp || "yellow"}`}>
      <h2>This web app has been designed for desktop</h2>
      <br />
      <p>Please use a bigger screen 🥲...</p>
    </div>
  );

  return <ContextConsumer>{(props) => renderPainting(props)}</ContextConsumer>;
}
