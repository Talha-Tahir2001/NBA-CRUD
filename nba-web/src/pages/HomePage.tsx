import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-6">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>🏀 NBA Admin Dashboard</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Manage players, stats, and teams.
          </p>

          <Button asChild className="w-full">
            <Link to="/players">Go to Players</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}