import swal from 'sweetalert';


const confirmAlert = async ({title ='Are you sure?',message}) => {

    const sl = await swal({
        title: title,
        text: message ?? false,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })

      return sl;
}


export {
    confirmAlert
}