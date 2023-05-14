// Add your custom JavaScript for storefront pages here.
const $timers1 = $('.timer-custom-1')
console.log($timers1)
if ($timers1.length) {
    console.log('entrei')
  const formatTimeCustom = timeNumber => timeNumber.toString().padStart(2, '0')
  $timers1.each(function () {
    const { end, maxHours } = $(this)[0].dataset
    const diffSeconds1 = Math.min(
      (new Date(end).getTime() - Date.now()) / 1000,
      maxHours * 3600
    )

    if (diffSeconds1 > 0) {
      let hours = Math.floor(diffSeconds1 / 3600)
      const hoursAsSeconds = hours * 3600
      let minutes = Math.floor((diffSeconds1 - hoursAsSeconds) / 60)
      let seconds = parseInt(diffSeconds1 - hoursAsSeconds - minutes * 60, 10)
      const $timerCount1 = $(this).find('.timer-custom')

      const updateTimerCount1 = () => {
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          seconds = minutes = 59
        } else {
          return clearInterval(stopwatch)
        }
        $timerCount1.html(`
        <div class="acute-parent timer-custom">
            <img class="acute-icon" alt="" src="/img/uploads/acute.svg">
            <div class="parent">
            <b class="b">${formatTimeCustom(hours)}</b>
            <div class="hrs">hrs</div>
            </div>
            <b class="b">:</b>
            <div class="parent">
            <b class="b">${formatTimeCustom(minutes)}</b>
            <div class="hrs">min</div>
            </div>
            <b class="b">:</b>
            <div class="parent">
            <b class="b">${formatTimeCustom(seconds)}</b>
            <div class="hrs">seg</div>
            </div>
        </div>`)
      }
      const stopwatch = setInterval(updateTimerCount1, 1000)
      updateTimerCount1()
    }
  })
}