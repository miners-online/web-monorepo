import { FullPageError } from "@carbon/ibm-products";
import { ExploreLinkList } from "./components/ExploreLinkList";

export default function NotFound() {
  return (
    <FullPageError
      title="Page Not Found"
      kind="404"
      label="Error 404"
      description="The page you are looking for does not exist or has been moved."
    >
      <ExploreLinkList/>
    </FullPageError>
  );
}