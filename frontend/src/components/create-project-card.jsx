import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

ProjectCard.propTypes = {
    handleCreateProject: PropTypes.func.isRequired,
    setProjectName: PropTypes.func.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
};
export function ProjectCard({
    handleCreateProject,
    setProjectName,
    setIsModalOpen
}) {
    return (
        <Card className="w-[350px] md:w-[500px]">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Create your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name of your project" onChange={(e) => setProjectName(e.target.value)} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button 
                    type="submit" 
                    onClick={handleCreateProject}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleCreateProject();
                        }
                    }}
                >Create</Button>
            </CardFooter>
        </Card>
    )
}



