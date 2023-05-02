import { useState } from "react";
import "./App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Paper, Typography } from "@mui/material";
import NavBar from "./components/NavBar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const inicialItems = [
  { id: "1", content: "Conteudo 1" },
  { id: "2", content: "Conteudo 2" },
  { id: "3", content: "Conteudo 3" },
];
const inicialColumns = [
  {
    name: "To do",
    id: "123",
    items: inicialItems,
  },
  {
    name: "Doing",
    id: "456",
    items: [],
  },
  {
    name: "Test",
    id: "789",
    items: [],
  },
  {
    name: "Done",
    id: "101112",
    items: [],
  },
];

function App() {
  const [columns, setColumns] = useState(inicialColumns);

  const onDragEnd = (result) => {
    var sourceColumnItems = [];
    var draggedItem = {};
    var destinationColumnItems = [];
    var sourceColumnId = 0;
    var destinationColumnId = 0;

    for (var i in columns) {
      if (columns[i].id === result.source.droppableId) {
        sourceColumnItems = columns[i].items;
        sourceColumnId = i;
      } else if (columns[i].id === result.destination.droppableId) {
        destinationColumnItems = columns[i].items;
        destinationColumnId = i;
      }
    }

    for (var i in sourceColumnItems) {
      if (sourceColumnItems[i].id === result.draggableId) {
        draggedItem = sourceColumnItems[i];
      }
    }

    var filteredSourceColumnItems = sourceColumnItems.filter(
      (item) => item.id !== result.draggableId
    );

    if (result.source.droppableId === result.destination.droppableId) {
      filteredSourceColumnItems.splice(
        result.destination.index,
        0,
        draggedItem
      );

      var columnsCopy = JSON.parse(JSON.stringify(columns));
      columnsCopy[sourceColumnId].items = filteredSourceColumnItems;
      setColumns(columnsCopy);
    } else {
      destinationColumnItems.splice(result.destination.index, 0, draggedItem);
      var columnsCopy = JSON.parse(JSON.stringify(columns));
      columnsCopy[sourceColumnId].items = filteredSourceColumnItems;
      columnsCopy[destinationColumnId].items = destinationColumnItems;
      setColumns(columnsCopy);
    }
  };

  return (
    <Box
      style={{
        backgroundImage:
          "radial-gradient(circle, #130639, #261258, #3d1b78, #572399, #742aba)",
      }}
    >
      <NavBar />
      <Box
        display="flex"
        justifyContent="center"
        height="100vh"
        margin="none"
        padding="0"
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided) => (
                    <Box
                      style={{
                        backgroundColor: "#ebebf1",
                        width: 300,
                        height: "fit-content",
                        padding: 10,
                        margin: 10,
                      }}
                    >
                      <Typography variant="h4">{column.name}</Typography>
                      <Box ref={provided.innerRef} width="100%" height="100%">
                        {column.items.map((item, index) => (
                          <Draggable
                            draggableId={item.id}
                            index={index}
                            key={item.id}
                          >
                            {(provided) => (
                              <Paper
                                elevation={2}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                style={{
                                  padding: 5,
                                  height: 40,
                                  marginTop: 10,
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {item.content}
                              </Paper>
                            )}
                          </Draggable>
                        ))}
                        <Button
                          style={{ marginTop: "10px", color: "#959dab" }}
                          size="large"
                          startIcon={<AddIcon />}
                        >
                          Card
                        </Button>
                      </Box>
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Box>
            </>
          ))}
        </DragDropContext>
      </Box>
    </Box>
  );
}

export default App;
