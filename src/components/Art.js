import { ContextConsumer } from "../Context";

export default function Art() {
  const renderPainting = ({
    paintingParts,
    columnSize,
    rawSize,
    partsNbrs,
    currentPainting,
  }) =>
    partsNbrs.map((part) => (
      <img
        src={paintingParts[part]}
        key={part}
        alt={`${currentPainting.name} section`}
        className={`part-${part}`}
        style={{ width: columnSize, height: rawSize }}
      />
    ));

  return <ContextConsumer>{(props) => renderPainting(props)}</ContextConsumer>;
}
