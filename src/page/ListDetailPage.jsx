import { useParams } from "react-router-dom";

export default function ListDetailPage() {
  let { id } = useParams();
  return <h1>List Detail Page - {id}</h1>;
}
