let x = 50;
let y = 160;
const speed = 1;
const canvasWidth = 400;
const canvasHeight = 300;

self.onmessage = (event: MessageEvent) => {
    if (event.data?.type ==='tick') {
        console.log('tick', event.data);
        x += speed;
        if (x > canvasWidth-150) {
            x = 0;
        }
        self.postMessage({ type: 'tick', x, y });
    }
    if (event.data?.type === 'init') {
        console.log('init', event.data);
        x = event.data.imgX ?? 50;
        y = event.data.imgY ?? 160;
        self.postMessage({ imgX: x, imgY: y });
    }
};