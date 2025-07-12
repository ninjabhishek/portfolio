import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import Fuse from "fuse.js";
import { SEARCH_DATA } from "@/lib/constants";

export default function SearchOverlay() {
  const { isSearchOpen, toggleSearch } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const fuse = new Fuse(SEARCH_DATA, {
    keys: ["title", "content", "category", "tags"],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
  });

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = fuse.search(searchTerm);
      setSearchResults(results.slice(0, 8));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleResultClick = (result: any) => {
    if (result.item.anchor) {
      const element = document.querySelector(result.item.anchor);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }
    toggleSearch();
    setSearchTerm("");
  };

  const highlightMatches = (text: string, matches: any[]) => {
    if (!matches || matches.length === 0) return text;
    
    let highlightedText = text;
    matches.forEach((match) => {
      const matchText = text.substring(match.indices[0][0], match.indices[0][1] + 1);
      highlightedText = highlightedText.replace(
        matchText,
        `<mark class="bg-[#667EEA]/30 text-[#667EEA] px-1 rounded">${matchText}</mark>`
      );
    });
    
    return highlightedText;
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold gradient-text">Search</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="hover:bg-white/10"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search projects, skills, experience..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-4 text-lg bg-background/50 border-border focus:border-[#667EEA] focus:ring-[#667EEA]/20"
                  autoFocus
                />
              </div>
              
              <div className="space-y-4">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glassmorphism p-4 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-300"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3
                            className="font-semibold text-lg mb-2"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatches(
                                result.item.title,
                                result.matches?.filter((m: any) => m.key === "title")
                              ),
                            }}
                          />
                          <p
                            className="text-muted-foreground text-sm mb-2"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatches(
                                result.item.content.substring(0, 150) + "...",
                                result.matches?.filter((m: any) => m.key === "content")
                              ),
                            }}
                          />
                          <span className="text-xs text-[#667EEA] bg-[#667EEA]/10 px-2 py-1 rounded">
                            {result.item.category}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground ml-4">
                          {Math.round((1 - result.score) * 100)}% match
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : searchTerm.trim() ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No results found for "{searchTerm}"
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Start typing to search...
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
