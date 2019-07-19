export const differentFromNow = (time) => {
  const date = new Date();
  const now = date.getTime();

  let difference = now - time;

  if (difference < 0)
    return 'now';

  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  if (daysDifference > 0)
    return (daysDifference + ((daysDifference > 1) ? ' days' : ' day'));
  difference -= daysDifference * 1000 * 60 * 60 * 24

  const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  if (hoursDifference > 0)
    return (hoursDifference + ((hoursDifference > 1) ? ' hours' : ' hour'));
  difference -= hoursDifference * 1000 * 60 * 60

  const minutesDifference = Math.floor(difference / 1000 / 60);
  if (minutesDifference > 0)
    return ((minutesDifference + ((minutesDifference > 1) ? ' minutes' : ' minute')));

  return 'now';
}