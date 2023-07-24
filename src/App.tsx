import Providers from "./providers/Providers";
import { HeartIcon, TrendingUpIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendingRepositories from "@/components/TrendingRepositories";
import FavoriteRepositories from "@/components/FavoriteRepositories";

function App() {
  return (
    <Providers>
      <Tabs defaultValue="trending" className="p-8 pt-0 min-h-screen max-w-4xl m-auto">
        <div className="sticky top-0 z-10">
          <div className="bg-white pt-5 pb-2">
            <TabsList className="grid grid-cols-2 max-w-md m-auto">
              <TabsTrigger value="trending">
                <TrendingUpIcon size={16} className="mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="favorites">
                <HeartIcon size={16} className="mr-2" />
                Favorites
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="bg-gradient-to-b from-white to-transparent h-4" />
        </div>

        <TabsContent value="trending" className="overflow-y-auto flex flex-col">
          <TrendingRepositories />
        </TabsContent>
        <TabsContent value="favorites" className="overflow-y-auto flex flex-col">
          <FavoriteRepositories />
        </TabsContent>
      </Tabs>
    </Providers>
  );
}

export default App;
