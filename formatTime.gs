function formatTime(time){
  newTime = time.replace(/-/g,'/').replace('T',' ');
  return newTime;
}