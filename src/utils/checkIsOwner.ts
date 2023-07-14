export default function checkIsOwner(user: any, contentOwnerId: any): boolean{
  if (user.role === 'ADMIN') return true
  if(contentOwnerId === user.id) return true
  return false
}
