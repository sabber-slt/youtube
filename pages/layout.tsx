import Nav from "@/components/Nav";
import SEO from "@/components/SEO";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <SEO />
      <Nav />
      {children}
      <div className="fixed bottom-5 text-xs center w-full">
        <p>
          Developed by{" "}
          <span className="text-red-500 text-[16px] font-semibold">
            Sabber Soltani
          </span>{" "}
        </p>
      </div>
    </>
  );
}
