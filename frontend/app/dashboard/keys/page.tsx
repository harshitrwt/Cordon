import { ApiKeysClient } from "../../../components/ApiKeysClient";

export const metadata = {
  title: "API Keys | Cordon Security Gateway",
  description: "Generate and manage API keys for Cordon SDK and Cloud Gateway.",
};

export default function ApiKeysPage() {
  return <ApiKeysClient />;
}
