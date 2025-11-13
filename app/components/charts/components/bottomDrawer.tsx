import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
export const BottomDrawerOptions = ({ openDrawer, setOpenDrawer , data ,toggle=null,setOrderBookFilter=null }) => {
  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer} >
      <DrawerContent className="pb-4 bg-gray-900">
         {data?.map((e)=>(
            <DrawerDescription onClick={()=>{
                  toggle && toggle();
                  toggle === null && setOrderBookFilter(e.value)
                  setOpenDrawer(false)
            }} className="text-center py-4 text-xl capitalize ">{e.value}</DrawerDescription>
         ))}
      </DrawerContent>
    </Drawer>
  );
};
