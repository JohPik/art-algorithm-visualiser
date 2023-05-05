import { ContextConsumer } from "../Context";

export default function Header(props) {
  const renderPainting = ({ currentPainting }) => (
    <div className={`logo ${currentPainting.colorApp || "yellow"}`}>
      <img src="/imgs/logo-artgorithm.svg" alt="Artgorithm logo" />
    </div>
  );

  return <ContextConsumer>{(props) => renderPainting(props)}</ContextConsumer>;
}
