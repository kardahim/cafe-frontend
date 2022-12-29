import { Button } from "@mui/material";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export function CustomToolbar(props: { destination: string, buttonText: string }) {
    const navigate = useNavigate()

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <Button
                onClick={() => navigate(props.destination)}
                startIcon={<AddIcon />}>
                {props.buttonText}
            </Button>
        </GridToolbarContainer>
    );
}