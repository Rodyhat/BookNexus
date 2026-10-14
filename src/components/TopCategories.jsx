const TopCategories = ({ categories = [], isLoading = false }) => {
    const barColors = ["bg-primary-container", "bg-emerald-600", "bg-amber-500", "bg-rose-500"];

    return (
        <section className="w-full rounded-lg bg-white px-6 py-6">
            <h3 className="pb-6 font-heading text-lg font-semibold">Catalog Genres</h3>
            {isLoading ? (
                <p className="text-sm text-slate-500">Loading genres...</p>
            ) : categories.length === 0 ? (
                <p className="text-sm text-slate-500">Genre breakdown will appear when books are added.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {categories.map((category, index) => (
                        <div key={category.name}>
                            <div className="flex justify-between gap-3 pb-2 text-sm">
                                <h6 className="truncate text-slate-700">{category.name}</h6>
                                <span className="shrink-0 text-slate-500">{category.count} · {category.percentage}%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className={`h-full ${barColors[index % barColors.length]}`}
                                    style={{ width: `${category.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default TopCategories;