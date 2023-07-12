import ItemCard from './ItemCard'

function ItemsGrid(props: any) {
  const { data, type } = props

  return (
    <div className="d-flex gap-3 flex-wrap">
      {data.map((item: any) => (
        <ItemCard key={item.id} item={item} type={type} />
      ))}
    </div>
  )
}

export default ItemsGrid
