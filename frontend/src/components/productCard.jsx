import {
  Box,
  HStack,
  Image,
  Button,
  Text,
  Heading,
  Dialog,
  Field,
  Input,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";

import { Pencil, Trash2 } from "lucide-react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: String(product.price),
    image: product.image,
  });

  const { deleteProduct, updateProduct } = useProductStore();

  const handleEditOpen = () => {
    setUpdatedProduct({
      name: product.name,
      price: String(product.price),
      image: product.image,
    });
    setIsEditOpen(true);
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    setIsUpdating(true);

    try {
      const { success, message } = await updateProduct(product._id, updatedProduct);

      toaster.create({
        title: success ? "Success" : "Error",
        description: message,
        type: success ? "success" : "error",
        duration: 5000,
      });

      if (success) {
        setIsEditOpen(false);
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update product.",
        type: "error",
        duration: 5000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
      duration: 5000,
    });
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h="48"
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md">
          {product.name}
        </Heading>

        <Text fontWeight="bold" color={textColor} mb={4} fontSize="xl">
          ${Number(product.price).toFixed(2)}
        </Text>

        <HStack gap={2}>
          <Dialog.Root
            open={isEditOpen}
            onOpenChange={(details) => setIsEditOpen(details.open)}
          >
            <Button
              onClick={handleEditOpen}
              variant="outline"
              colorPalette="blue"
            >
              <Pencil size={16} />
              Edit
            </Button>

            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Edit Product</Dialog.Title>
                  </Dialog.Header>

                  <Box as="form" onSubmit={handleUpdateProduct}>
                    <Dialog.Body>
                      <VStack gap={4} align="stretch">
                        <Field.Root>
                          <Field.Label htmlFor={`product-name-${product._id}`}>
                            Product Name
                          </Field.Label>
                          <Input
                            id={`product-name-${product._id}`}
                            name="name"
                            value={updatedProduct.name}
                            onChange={(event) =>
                              setUpdatedProduct((current) => ({
                                ...current,
                                name: event.target.value,
                              }))
                            }
                          />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label htmlFor={`product-price-${product._id}`}>
                            Product Price
                          </Field.Label>
                          <Input
                            id={`product-price-${product._id}`}
                            name="price"
                            type="number"
                            step="any"
                            value={updatedProduct.price}
                            onChange={(event) =>
                              setUpdatedProduct((current) => ({
                                ...current,
                                price: event.target.value,
                              }))
                            }
                          />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label htmlFor={`product-image-${product._id}`}>
                            Product Image URL
                          </Field.Label>
                          <Input
                            id={`product-image-${product._id}`}
                            name="image"
                            value={updatedProduct.image}
                            onChange={(event) =>
                              setUpdatedProduct((current) => ({
                                ...current,
                                image: event.target.value,
                              }))
                            }
                          />
                        </Field.Root>
                      </VStack>
                    </Dialog.Body>

                    <Dialog.Footer>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditOpen(false)}
                        disabled={isUpdating}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        colorPalette="blue"
                        loading={isUpdating}
                      >
                        Save Changes
                      </Button>
                    </Dialog.Footer>
                  </Box>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          <Button
            onClick={() => handleDeleteProduct(product._id)}
            variant="outline"
            colorPalette="red"
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
