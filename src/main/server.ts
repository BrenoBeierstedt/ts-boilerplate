import app from './config/app'

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
app.listen( 3000, () => console.log(`Server running at: http://localhost:${process.env.PORT}`))
