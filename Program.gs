package MyGSharpApp

import System
import SixLabors.ImageSharp
import SixLabors.ImageSharp.PixelFormats
import SixLabors.ImageSharp.Processing
import SixLabors.ImageSharp.Drawing.Processing

func normalSample(mean float64, stdDev float64) float64 {
    let u1 = Random.Shared.NextDouble()
    let u2 = Random.Shared.NextDouble()
    let z = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Cos(2.0 * Math.PI * u2)
    return mean + stdDev * z
}

func clampByte(v float64) uint8 {
    if v < 0.0 {
        return uint8(0)
    }
    if v > 255.0 {
        return uint8(255)
    }
    return uint8(v)
}

func getRandomColor() Color {
    let r = clampByte(normalSample(200.0, 60.0))
    let g = clampByte(normalSample(50.0, 20.0))
    let b = clampByte(normalSample(50.0, 20.0))
    return Color(Rgba32(r, g, b, uint8(0x44)))
}

const width = 800.0
func randomTile(ctx IImageProcessingContext) {
    for i := 0; i < 7500; i++ {
        let randX = float32(normalSample(width / 2.0, 300.0))
        let randY = float32(normalSample(400.0, 300.0))
        let randW = float32(normalSample(50.0, 20.0))
        let randH = float32(normalSample(50.0, 20.0))
        ctx.Fill(getRandomColor(), RectangleF(randX, randY, randW, randH))
    }
}

var image = Image[Rgba32](800, 800)
image.Mutate(func(ctx IImageProcessingContext) {
    ctx.Clear(Color.White)
    randomTile(ctx)
})
image.Save("squares.png")
