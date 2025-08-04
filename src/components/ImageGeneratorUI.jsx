"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Upload, ChevronDown, Image as ImageIcon, Sparkles, Menu, X } from 'lucide-react';
import logo from "../assets/caratcanvas logo.png";
import { Link } from 'react-router';

const ImageGeneratorUI = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('Firefly Image 4');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('Landscape (4:3)');
  const [contentType, setContentType] = useState('Photo');
  const [autoMode, setAutoMode] = useState(true);
  const [visualIntensity, setVisualIntensity] = useState([50]);
  const [referenceType, setReferenceType] = useState('Reference');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Collapsible states
  const [generalOpen, setGeneralOpen] = useState(true);
  const [contentTypeOpen, setContentTypeOpen] = useState(true);
  const [visualIntensityOpen, setVisualIntensityOpen] = useState(true);
  const [compositionOpen, setCompositionOpen] = useState(true);

  const aspectRatios = [
    'Landscape (4:3)',
    'Portrait (3:4)', 
    'Square (1:1)',
    'Wide (16:9)'
  ];

  const models = [
    'Firefly Image 4',
    'Firefly Image 3', 
    'Firefly Image 2'
  ];

  const referenceOptions = [
    'Reference',
    'Structure',
    'Style'
  ];

  // Sidebar Content Component
  const SidebarContent = () => (
    <div className="h-screen bg-gradient-75-50 shadow-md  p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
    <Link to={"/"} >
      <img src={logo} alt="" srcset="" />
    </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          className="lg:hidden text-[#5A2E1F] hover:bg-transparent"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* General Settings */}
      <Collapsible open={generalOpen} onOpenChange={setGeneralOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left hover:bg-transparent rounded-md px-2 -mx-2">
          <h3 className="text-sm font-medium text-primary-900">General settings</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${generalOpen ? 'rotate-0' : '-rotate-90'}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div>
            <Label className="text-xs text-primary-900 mb-2 block">Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="bg-transparent border-gray-700 text-[#5A2E1F] hover:bg-gray-750">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-transparent border-gray-700">
                {models.map((model) => (
                  <SelectItem key={model} value={model} className="text-[#5A2E1F] hover:bg-primary-500 focus:bg-gray-700">
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-primary-900 mb-2 block">Aspect ratio</Label>
            <div className="grid grid-cols-1 gap-2">
              {aspectRatios.map((ratio) => (
                <label key={ratio} className="flex items-center space-x-2 cursor-pointer hover:bg-transparent rounded-md p-2 -mx-2">
                  <input
                    type="radio"
                    name="aspectRatio"
                    value={ratio}
                    checked={selectedAspectRatio === ratio}
                    onChange={(e) => setSelectedAspectRatio(e.target.value)}
                    className="w-4 h-4 text-[#CD9970] bg-transparent border-gray-600 focus:ring-[#CD9970] focus:ring-2"
                  />
                  <span className="text-sm text-primary-900">{ratio}</span>
                </label>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Content Type */}
      <Collapsible open={contentTypeOpen} onOpenChange={setContentTypeOpen} className="mt-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left hover:bg-transparent rounded-md px-2 -mx-2">
          <h3 className="text-sm font-medium text-primary-900">Content type</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${contentTypeOpen ? 'rotate-0' : '-rotate-90'}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="flex space-x-2">
            <Button
              variant={contentType === 'Photo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setContentType('Photo')}
              className={`flex-1 transition-all ${
                contentType === 'Photo' 
                  ? 'bg-[#CD9970] hover:bg-[#b8875f] text-white border-[#CD9970]' 
                  : 'bg-transparent hover:bg-primary-500 text-primary-900  border-primary-600 hover:border-primary-500'
              }`}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Photo
            </Button>
            <Button
              variant={contentType === 'Art' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setContentType('Art')}
              className={`flex-1 transition-all ${
                contentType === 'Art' 
                  ? 'bg-[#CD9970] hover:bg-[#b8875f] text-[#5A2E1F] border-[#CD9970]' 
                  : 'bg-transparent hover:bg-primary-500 text-primary-900 border-gray-600 hover:border-gray-500'
              }`}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Art
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-2 hover:bg-transparent rounded-md -mx-2">
            <Label className="text-sm text-primary-900">Auto</Label>
            <Switch
              checked={autoMode}
              onCheckedChange={setAutoMode}
              className="data-[state=checked]:bg-[#CD9970] data-[state=unchecked]:bg-gray-700"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Visual Intensity */}
      <Collapsible open={visualIntensityOpen} onOpenChange={setVisualIntensityOpen} className="mt-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left hover:bg-transparent rounded-md px-2 -mx-2">
          <h3 className="text-sm font-medium text-primary-900">Visual intensity</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${visualIntensityOpen ? 'rotate-0' : '-rotate-90'}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="space-y-2 px-2">
            <Slider
              value={visualIntensity}
              onValueChange={setVisualIntensity}
              max={100}
              step={1}
              className="w-full [&>span:first-child]:bg-gray-700 [&>span:first-child>span]:bg-[#CD9970]"
            />
            <div className="flex justify-between text-xs text-primary-900">
              <span>Low</span>
              <span className="text-[#CD9970] font-medium">{visualIntensity[0]}%</span>
              <span>High</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Composition */}
      <Collapsible open={compositionOpen} onOpenChange={setCompositionOpen} className="mt-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left hover:bg-transparent rounded-md px-2 -mx-2">
          <h3 className="text-sm font-medium text-primary-900">Composition</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${compositionOpen ? 'rotate-0' : '-rotate-90'}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div>
            <Select value={referenceType} onValueChange={setReferenceType}>
              <SelectTrigger className="bg-transparent border-gray-700 text-[#5A2E1F] hover:bg-gray-750">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-transparent border-gray-700">
                {referenceOptions.map((option) => (
                  <SelectItem key={option} value={option} className="text-[#5A2E1F] hover:bg-primary-500 focus:bg-gray-700">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reference Images Upload Area */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-transparent hover:bg-primary-500 text-primary-900 border-gray-600 hover:border-gray-500"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add image
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-transparent hover:bg-primary-500 text-primary-900 border-gray-600 hover:border-gray-500"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Browse gallery
              </Button>
            </div>
            
            {/* Reference Thumbnails Grid */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-transparent border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center hover:border-[#CD9970] hover:bg-gray-750 transition-all cursor-pointer group"
                >
                  <ImageIcon className="h-6 w-6 text-gray-500 group-hover:text-[#CD9970] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  return (
    <div className="min-h-screen  flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Firefly Generator</h1>
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 shrink-0">
        <SidebarContent />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Main Generation Area */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="text-center max-w-lg">
            {/* Illustration */}
            <div className="mb-8">
              <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto bg-gradient-to-br from-[#CD9970] to-[#b8875f] rounded-2xl flex items-center justify-center mb-4 relative shadow-lg">
                <div className="absolute top-1.5 right-1.5 lg:top-2 lg:right-2 w-5 h-5 lg:w-6 lg:h-6 bg-orange-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2.5 w-2.5 lg:h-3 lg:w-3 text-[#5A2E1F]" />
                </div>
                <ImageIcon className="h-12 w-12 lg:h-16 lg:w-16 text-[#5A2E1F]" />
              </div>
            </div>

            {/* Text Content */}
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
              Start generating images
            </h2>
            <p className="text-gray-600 mb-2 text-sm lg:text-base">
              Describe the image you want to generate in the prompt field.
            </p>
            <p className="text-gray-600 text-sm lg:text-base">
              For inspiration, go to{' '}
              <button className="text-[#CD9970] hover:underline font-medium transition-colors">
                Gallery
              </button>{' '}
              or{' '}
              <button className="text-[#CD9970] hover:underline font-medium transition-colors">
                learn more about prompting
              </button>
              .
            </p>
          </div>
        </div>

        {/* Bottom Prompt Area */}
        <div className="bg-gradient-75-50 p-4 lg:p-6 border-t border-primary-200">
          <div className="max-w-[90%] my-8 mx-auto">
            <Label className="text-sm text-primary-900 mb-3 block">Prompt</Label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your image"
                className="flex-1 bg-transparent border-gray-700 text-[#5A2E1F] placeholder-gray-400 focus:border-[#CD9970] focus:ring-[#CD9970] h-12"
              />
              <Button
                size="lg"
                className="bg-[#CD9970] hover:bg-[#b8875f] text-[#5A2E1F] px-6 sm:px-8 h-12 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!prompt.trim()}
              >
                Generate
              </Button>
            </div>
            {prompt && (
              <div className="mt-2 text-xs text-gray-500">
                {prompt.length} characters
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneratorUI;
