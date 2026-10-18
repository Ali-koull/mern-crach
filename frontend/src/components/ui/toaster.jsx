import {
  Toaster as ChakraToaster,
  Toast,
  createToaster,
} from "@chakra-ui/react";

// eslint-disable-next-line react-refresh/only-export-components
export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
  pauseOnHover: true,
});

export function Toaster() {
  return (
    <ChakraToaster toaster={toaster} zIndex={9999}>
      {(toast) => (
        <Toast.Root width="360px" maxWidth="calc(100vw - 32px)" padding="16px">
          <Toast.Title>{toast.title}</Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
          <Toast.CloseTrigger />
        </Toast.Root>
      )}
    </ChakraToaster>
  );
}
