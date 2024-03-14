import Column from "~/components/layout/Column";
import Flex from "~/components/layout/Flex";
import PageTitle from "~/components/meta/PageTitle";
import DownloadURL from "~/components/input/DownloadURL";
import {FaBrandsChrome, FaBrandsEdge, FaBrandsOpera} from "solid-icons/fa";
import {SiBrave} from "solid-icons/si";

const CHROME_EXTENSION = "https://chromewebstore.google.com/detail/opdjjolnlpkikpjmghecgflkbjipaghe"

export default function Extension() {
  return (
    <main class={"pb-8"}>
      <Column class={"center"}>
        <PageTitle>Get extension</PageTitle>
        <Flex class={"flex-col lg:flex-row justify-around lg:w-full"}>
          <Column class={"center w-full"}>
            <DownloadURL
              downloadURL={CHROME_EXTENSION}
              icon={
                <Flex>
                  <FaBrandsEdge size={72} class="m-8 fill-stone-800 dark:fill-yellow-200"/>
                  <SiBrave size={72} class="m-8 fill-stone-800 dark:fill-yellow-200"/>
                  <FaBrandsChrome size={72} class="m-8 fill-stone-800 dark:fill-yellow-200"/>
                  <FaBrandsOpera size={72} class="m-8 fill-stone-800 dark:fill-yellow-200"/>
                </Flex>
              }
              label={"Chrome-based browsers"}
            />
          </Column>
        </Flex>
      </Column>
    </main>
  )
}