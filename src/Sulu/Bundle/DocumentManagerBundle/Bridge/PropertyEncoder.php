<?php

namespace Sulu\Bundle\DocumentManagerBundle\Bridge;

use Sulu\Component\DocumentManager\DocumentRegistry;
use Sulu\Component\DocumentManager\PathSegmentRegistry;
use Sulu\Component\DocumentManager\DocumentInspector as BaseDocumentInspector;
use Sulu\Component\Content\Document\Behavior\StructureBehavior;
use Sulu\Component\DocumentManager\Metadata;
use Sulu\Component\DocumentManager\ProxyFactory;
use Sulu\Component\DocumentManager\NamespaceRegistry;
use Sulu\Component\Content\Document\Subscriber\StructureSubscriber;
use Sulu\Component\Content\Document\LocalizationState;
use Sulu\Component\DocumentManager\PropertyEncoder as BasePropertyEncoder;
use Sulu\Component\Content\Metadata\PropertyMetadata;

/**
 * This class infers information about documents, for example
 * the documents locale, webspace, path, etc.
 */
class PropertyEncoder extends BasePropertyEncoder
{
    /**
     * @param NamespaceRegistry $namespaceRegistry
     */
    public function __construct(NamespaceRegistry $namespaceRegistry)
    {
        parent::__construct($namespaceRegistry);
    }

    public function fromProperty(PropertyMetadata $property, $locale = null)
    {
        if (true === $property->isLocalized()) {
            return $this->localizedContentName($property->getName(), $locale);
        }

        return $this->contentname($property->getName());
    }
}

