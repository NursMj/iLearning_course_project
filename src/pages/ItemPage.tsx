import { useParams } from 'react-router-dom'

function ItemPage() {
  const id = useParams().id
  return <>Item # {id}</>
}

export default ItemPage
