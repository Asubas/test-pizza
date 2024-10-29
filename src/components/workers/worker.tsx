import { useParams } from "react-router-dom";

function Worker() {
  const { id } = useParams();
  return (
    <>
      <div>Работник {id}</div>
    </>
  );
}

export { Worker };
