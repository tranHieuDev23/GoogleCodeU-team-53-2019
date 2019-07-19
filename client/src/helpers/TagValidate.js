export const santinization = (input) => {
  input = String(input);
  input = input.replace('_',' ');
  input = input.replace(/\s\s+/g, ' ');
  input = input.trim();
  let result = '';
  for(let i = 0; i < input.length; i++) 
    result += ((input[i] === ' ')? ('_'):(input[i]));
  return result;
}

export const tagSanitization = (tags) => {
  if (Array.isArray(tags)) {
    for (let i = 0; i < tags.length; i++)
      tags[i] = santinization(tags[i]);
  }
  return tags;
}