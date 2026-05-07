import { Drawer } from 'vaul';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Drawer.Root>
  );
}

export function SheetContent({ children }: { children: React.ReactNode }) {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="sheet__overlay" />
      <Drawer.Content className="sheet__content">
        <div className="sheet__handle" />
        <div className="sheet__body">{children}</div>
      </Drawer.Content>
    </Drawer.Portal>
  );
}

export function SheetTitle({ children }: { children: React.ReactNode }) {
  return <Drawer.Title className="sheet__title">{children}</Drawer.Title>;
}
