import { Card, CardFooter, Image, Button } from '@nextui-org/react'
import cleanWallpaper from '../assets/clean-wallpaper.jpg'
import aboutCodingWallpaper from '../assets/about-coding-wallpaper.jpg'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Line 1: h1 */}
      <div>
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
          Clean Services | Best Route
        </h1>
      </div>

      {/* Line 2: Cards (responsive) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Card */}
        <Card isFooterBlurred radius="lg" className="border-none">
          <Image
            alt="Woman listening to music"
            className="object-cover"
            height={400}
            src={cleanWallpaper}
            width={400}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-black font-bold">
              Manage clients and routes.
            </p>
            <Link to="/clients">
              <Button
                className="text-tiny text-white bg-black/20 font-bold"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Go!
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Second Card */}
        <Card isFooterBlurred radius="lg" className="border-none">
          <Image
            alt="Woman listening to music"
            className="object-cover"
            height={400}
            src={aboutCodingWallpaper}
            width={400}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white font-bold">About project.</p>
            <Link to="/about">
              <Button
                className="text-tiny text-white bg-black/20 font-bold"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Go!
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Homepage
