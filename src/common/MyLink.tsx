import { Link } from 'react-router-dom'

function MyLink({ to, content }: any) {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {content}
    </Link>
  )
}

export default MyLink
