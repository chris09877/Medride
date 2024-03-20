export function separateDateAndTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const time = dateTime.toLocaleTimeString('nl-NL', {
 
    hour: '2-digit',
     
    minute: '2-digit',})
  return time;
}
