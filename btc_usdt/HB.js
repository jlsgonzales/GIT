

function heartbeat() {
  clearTimeout(this.pingTimeout);

  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}