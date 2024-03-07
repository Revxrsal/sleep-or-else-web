import Row from "~/components/layout/Row";
import Spacer from "~/components/decoration/Spacer";
import Pg from "~/components/typography/Pg";

export function AppLogo() {
  return (
    <a href="/">
      <Row class={"flex w-fit justify-between m-6 cursor-pointer"}>
        <img src="/logo.png" alt="App logo" class={"w-14 h-14 drop-shadow-lg"}/>
        <Spacer class={"mx-2"}/>
        <Pg class={"hidden lg:flex font-semibold text-2xl"}>Sleep, or else...</Pg>
      </Row>
    </a>
  );
}
