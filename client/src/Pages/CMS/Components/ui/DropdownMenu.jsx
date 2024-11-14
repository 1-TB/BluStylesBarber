import { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

const DropdownMenu = ({ 
  items = [],
  align = 'right',
  disabled = false,
  className = '',
  trigger = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Custom Trigger or Default */}
      <div onClick={() => !disabled && setIsOpen(!isOpen)}>
        {trigger || (
          <button
            disabled={disabled}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Menu"
          >
            <MoreVertical className="h-4 w-4 text-gray-600" />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
            ${align === 'right' ? 'right-0' : 'left-0'}
            animate-in fade-in duration-200
          `}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {items.map((item, index) => {
              // separator
              if (item.label === '-') {
                return <div key={index} className={item.className || 'border-t my-1'} />;
              }

              //menu item
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-2 text-sm
                    ${item.className || ''}
                    ${item.variant === 'destructive' ? 'text-red-600 hover:bg-red-50' : 
                      item.variant === 'success' ? 'text-green-600 hover:bg-green-50' : 
                      'text-gray-700 hover:bg-gray-100'}
                    transition-colors duration-150
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  disabled={item.disabled}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                    {item.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;