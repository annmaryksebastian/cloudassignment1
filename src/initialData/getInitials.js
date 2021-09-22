const getInitials = (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ') //demonstrating split
  .slice(0, 3) //demonstarting slice
  .map((v) => v && v[0].toUpperCase())
  .join('');

export default getInitials;