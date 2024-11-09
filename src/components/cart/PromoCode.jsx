const PromoCode = () => {
    return (
        <div className="mt-5">
            <h3 className="font-medium text-sm">Promo code</h3>
            <div className="mt-4 flex gap-2">
                <input className="min-w-0 w-full h-11 border bg-[#f5f5f5] border-[rgb(226,226,226)] outline-none rounded-sm" type="text"  />
                <button className="btn btn-sm h-11 btn-error text-white min-w-20">Apply</button>
            </div>
        </div>
    );
};

export default PromoCode;