const FeaturedCutCard = ({ image, title, price, time, summary }) => {
    return (
      <div className="min-w-[280px] p-4 border border-slate-700 rounded-lg 
        bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 
        hover:from-slate-800/90 hover:via-slate-800/70 hover:to-slate-900/90
        transition-all duration-300 ease-in-out
        shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      >
        <div className="overflow-hidden rounded-lg mb-4">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-64 object-cover shadow-md 
              transition-transform duration-300 ease-in-out
              hover:scale-105"
          />
        </div>
        <h3 className="text-slate-200 text-lg mb-2">{title}</h3>
        <div className="flex items-center justify-between mb-2">
          <p className="text-blue-400 font-semibold">${price}</p>
          <p className="text-slate-400 text-sm">{time} mins</p>
        </div>
        <p className="text-slate-300 text-sm">{summary}</p>
      </div>
    );
  };
  
  export default FeaturedCutCard;