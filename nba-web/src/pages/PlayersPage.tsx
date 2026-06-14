import { useEffect, useState } from "react";

import { toast } from "sonner";
import { playerApi, type Player } from "../lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Badge } from "../components/ui/badge";


export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const data = await playerApi.getAll();
        setPlayers(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load players";

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    void fetchPlayers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await playerApi.delete(id);
      setPlayers((prev) => prev.filter((p) => p._id !== id));
      toast.success("Player deleted");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete player";

      toast.error(message);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Players</h1>
        <Button>Add Player</Button>
      </div>

      <Card>
        {loading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>PPG</TableHead>
                <TableHead>All Star</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {players.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.team}</TableCell>
                  <TableCell>{p.position}</TableCell>
                  <TableCell>{p.pointsPerGame}</TableCell>

                  <TableCell>
                    {p.isAllStar ? (
                      <Badge>Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>

                  <TableCell className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}