
const addToCart = (productId)=>{
    showLoading();
    $.get(`/shop/add-to-cart/${productId}`, function(data, status) {
        $('#totalQtyCart').text(`${data.totalQty}`);
        Swal.fire(
            'Good job!',
            data.message,
            'success'
          )
      
    });
};

const emptyCart = ()=>{
    showLoading();
    $.get(`/shop/empty-cart`, function(data, status) {
        $('#totalQtyCart').text(`${data.totalQty}`);
        $('#cart-container').html(`<div class="row text-center">
        <div class="col-md-9 col-sm-9 m-auto">
          <h2>No items in the cart</h2>
        </div>
      </div>`);

        Swal.fire(
            'Good job!',
            data.message,
            'success'
          )
      
    });
};

const addToQuantity = (productId)=>{
    showLoading();
    $.get(`/shop/add-to-cart/${productId}`, function(data, status) {
        $('#totalQtyCart').text(`${data.totalQty}`);
        $('#shoppingCart-productQty').text(`${data.productQty}`);
        $('#shoppingCart-productPrice').text(`${data.productPrice} $`);
        $('#shoppingCart-productTotalPrice').text(`${data.productTotalPrice} $`);
        $('#amount_checkout').text(`${data.cartTotalPrice} $`);

        Swal.fire(
            'Good job!',
            'quantity added',
            'success'
          )
      
    });
};

const reduceToQuantity = (productId)=>{
    showLoading();
    $.get(`/shop/reduce/${productId}`, function(data, status) {
        $('#totalQtyCart').text(`${data.totalQty}`);
        $('#shoppingCart-productQty').text(`${data.productQty}`);
        $('#shoppingCart-productPrice').text(`${data.productPrice} $`);
        $('#shoppingCart-productTotalPrice').text(`${data.productTotalPrice} $`);
        $('#amount_checkout').text(`${data.cartTotalPrice} $`);

        Swal.fire(
            'Good job!',
            'quantity reduced',
            'success'
          )
      
    });
};

const showLoading=()=>{
    Swal.fire({
        title: 'Please Wait',
        allowEscapeKey: false,
        allowOutsideClick: false,
        background: '#19191a',
        showConfirmButton: false,
        onOpen: ()=>{
            Swal.showLoading();
        }
    });
}