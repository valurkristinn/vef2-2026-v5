import Image from "next/image";
import "@/styles/_hero.scss";

export default function Hero({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="hero">
      <h1>{title}</h1>
      <div>
        <Image
          src={image}
          alt="Opening image"
          width={500}
          height={300}
          loading="eager"
        />
      </div>
    </div>
  );
}
